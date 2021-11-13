import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Materia, MateriaRelations, Grupo} from '../models';
import {GrupoRepository} from './grupo.repository';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id,
  MateriaRelations
> {

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof Materia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Materia, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
