import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProgramaAcademico, ProgramaAcademicoRelations, Materia} from '../models';
import {MateriaRepository} from './materia.repository';

export class ProgramaAcademicoRepository extends DefaultCrudRepository<
  ProgramaAcademico,
  typeof ProgramaAcademico.prototype.id,
  ProgramaAcademicoRelations
> {

  public readonly programaAcademicoMateria: HasManyRepositoryFactory<Materia, typeof ProgramaAcademico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(ProgramaAcademico, dataSource);
    this.programaAcademicoMateria = this.createHasManyRepositoryFactoryFor('programaAcademicoMateria', materiaRepositoryGetter,);
    this.registerInclusionResolver('programaAcademicoMateria', this.programaAcademicoMateria.inclusionResolver);
  }
}
