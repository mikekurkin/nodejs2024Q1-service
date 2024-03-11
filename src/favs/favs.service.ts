import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Favorites, FavoritesResponse } from './favs.interface';

@Injectable()
export class FavsService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  private readonly favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getFavs(): Promise<FavoritesResponse> {
    return {
      artists: (
        await Promise.allSettled(
          this.favs.artists.map((id) => this.artistService.findOne(id)),
        )
      ).flatMap((prm) =>
        prm.status == 'fulfilled' && prm.value ? [prm.value] : [],
      ),
      albums: (
        await Promise.allSettled(
          this.favs.albums.map((id) => this.albumService.findOne(id)),
        )
      ).flatMap((prm) =>
        prm.status == 'fulfilled' && prm.value ? [prm.value] : [],
      ),
      tracks: (
        await Promise.allSettled(
          this.favs.tracks.map((id) => this.trackService.findOne(id)),
        )
      ).flatMap((prm) =>
        prm.status == 'fulfilled' && prm.value ? [prm.value] : [],
      ),
    };
  }

  async addTrack(trackId: string): Promise<void> {
    const track = await this.trackService.findOne(trackId).catch(() => {
      return Promise.reject();
    });
    if (!this.favs.tracks.includes(track.id)) this.favs.tracks.push(track.id);
  }

  async removeTrack(trackId: string): Promise<void> {
    const favsIndex = this.favs.tracks.indexOf(trackId);
    if (favsIndex == -1) return Promise.reject();
    this.favs.tracks.splice(favsIndex, 1);
  }

  async addArtist(artistId: string): Promise<void> {
    const artist = await this.artistService.findOne(artistId).catch(() => {
      return Promise.reject();
    });
    if (!this.favs.artists.includes(artist.id))
      this.favs.artists.push(artist.id);
  }

  async removeArtist(artistId: string): Promise<void> {
    const favsIndex = this.favs.artists.indexOf(artistId);
    if (favsIndex == -1) return Promise.reject();
    this.favs.artists.splice(favsIndex, 1);
  }

  async addAlbum(albumId: string): Promise<void> {
    const album = await this.albumService.findOne(albumId).catch(() => {
      return Promise.reject();
    });
    if (!this.favs.albums.includes(album.id)) this.favs.albums.push(album.id);
  }

  async removeAlbum(albumId: string): Promise<void> {
    const favsIndex = this.favs.albums.indexOf(albumId);
    if (favsIndex == -1) return Promise.reject();
    this.favs.albums.splice(favsIndex, 1);
  }
}
