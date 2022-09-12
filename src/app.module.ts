import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.db',
      synchronize: true,
      logging: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    AlbumsModule,
    ArtistsModule,
    AuthModule,
    PlaylistsModule,
    SongsModule,
    UsersModule,
  ],
})
export class AppModule {}
