import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne(id, {
      loadEagerRelations: true,
    });

    if (!song) {
      throw new HttpException('Song does not exists', HttpStatus.NOT_FOUND);
    }

    return song;
  }

  async like(songId: number, user: User): Promise<Song> {
    const song = await this.findOne(songId);

    if (song.likes.find((p) => p.id === user.id)) {
      throw new HttpException('Song is already liked', HttpStatus.BAD_REQUEST);
    }

    song.likes.push(user);

    return await this.songRepository.save(song);
  }

  async unlike(songId: number, user: User): Promise<Song> {
    const song = await this.findOne(songId);

    if (!song.likes.find((p) => p.id === user.id)) {
      throw new HttpException('Song is not liked', HttpStatus.BAD_REQUEST);
    }

    song.likes = song.likes.filter((p: User) => p.id != user.id);

    return await this.songRepository.save(song);
  }
}
