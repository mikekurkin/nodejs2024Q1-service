import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [TrackModule, TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistModule {}
