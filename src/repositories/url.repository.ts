import {DefaultCrudRepository} from '@loopback/repository';
import {Url, UrlRelations} from '../models';
import {UrlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UrlRepository extends DefaultCrudRepository<
  Url,
  typeof Url.prototype.short,
  UrlRelations
> {
  constructor(
    @inject('datasources.url') dataSource: UrlDataSource,
  ) {
    super(Url, dataSource);
  }
}
