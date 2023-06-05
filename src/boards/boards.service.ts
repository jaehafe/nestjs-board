import { Injectable, NotFoundException } from '@nestjs/common';

import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

// 다른 곳에서도 주입해서 사용할 수 있게 @Injectable 데코레이터 사용
@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    console.log('board2=', board);
    return board;
  }
}
