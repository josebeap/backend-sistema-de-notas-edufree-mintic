import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstudianteGrupo, EstudianteGrupoRelations, Nota} from '../models';
import {NotaRepository} from './nota.repository';

export class EstudianteGrupoRepository extends DefaultCrudRepository<
  EstudianteGrupo,
  typeof EstudianteGrupo.prototype.id,
  EstudianteGrupoRelations
> {

  public readonly notas: HasManyRepositoryFactory<Nota, typeof EstudianteGrupo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('NotaRepository') protected notaRepositoryGetter: Getter<NotaRepository>,
  ) {
    super(EstudianteGrupo, dataSource);
    this.notas = this.createHasManyRepositoryFactoryFor('notas', notaRepositoryGetter,);
    this.registerInclusionResolver('notas', this.notas.inclusionResolver);
  }
}
