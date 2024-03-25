import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesResponse {
  @ApiProperty({ type: [ArtistEntity] })
  artists: ArtistEntity[];
  @ApiProperty({ type: [AlbumEntity] })
  albums: AlbumEntity[];
  @ApiProperty({ type: [TrackEntity] })
  tracks: TrackEntity[];
}
