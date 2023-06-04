import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456789',
  database: 'nestjs-board',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
