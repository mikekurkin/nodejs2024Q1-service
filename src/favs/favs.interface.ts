import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/album.entity';
import { Album } from 'src/album/album.interface';
import { ArtistEntity } from 'src/artist/artist.entity';
import { Artist } from 'src/artist/artist.interface';
import { TrackEntity } from 'src/track/track.entity';
import { Track } from 'src/track/track.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesResponse {
  @ApiProperty({ type: [ArtistEntity] })
  artists: Artist[];
  @ApiProperty({ type: [AlbumEntity] })
  albums: Album[];
  @ApiProperty({ type: [TrackEntity] })
  tracks: Track[];
}
