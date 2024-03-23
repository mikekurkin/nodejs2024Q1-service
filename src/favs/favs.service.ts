import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { DataSource, Equal, In, Repository } from 'typeorm';
import { EntityType, FavoriteEntity } from './favs.entity';
import { FavoritesResponse } from './favs.interface';

@Injectable()
export class FavsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  repos = {
    tracks: this.dataSource.getRepository(TrackEntity),
    albums: this.dataSource.getRepository(AlbumEntity),
    artists: this.dataSource.getRepository(ArtistEntity),
    favs: this.dataSource.getRepository(FavoriteEntity),
  };

  async getFavs(): Promise<FavoritesResponse> {
    const favs = Object.fromEntries(
      await Promise.all(
        Object.entries<string[]>(
          (
            await this.repos.favs.find()
          ).reduce((acc, { entityType, entityId }: FavoriteEntity) => {
            acc[entityType] = acc[entityType] ?? [];
            acc[entityType].push(entityId);
            return acc;
          }, {}),
        ).map(async ([entityType, entityIds]) => [
          entityType,
          this.repos[entityType] instanceof Repository
            ? await this.repos[entityType].find({
                where: { id: In(entityIds) },
              })
            : null,
        ]),
      ),
    );
    return favs as unknown as Promise<FavoritesResponse>;
  }

  async addEntity(entityId: string, entityType: EntityType) {
    if (
      !(await this.repos[entityType].exists({ where: { id: Equal(entityId) } }))
    )
      return Promise.reject();
    const entity = new FavoriteEntity({ entityId, entityType });
    await this.repos.favs.save(entity);
  }

  async removeEntity(entityId: string, entityType: EntityType) {
    const entity = await this.repos.favs.findOne({
      where: { entityId: Equal(entityId), entityType: Equal(entityType) },
    });
    if (entity == null) return Promise.reject();
    await this.repos.favs.remove([entity]);
  }
}
