import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProgramaAcademico,
  Materia,
} from '../models';
import {ProgramaAcademicoRepository} from '../repositories';

export class ProgramaAcademicoMateriaController {
  constructor(
    @repository(ProgramaAcademicoRepository) protected programaAcademicoRepository: ProgramaAcademicoRepository,
  ) { }

  @get('/programa-academicos/{id}/materias', {
    responses: {
      '200': {
        description: 'Array of ProgramaAcademico has many Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Materia>,
  ): Promise<Materia[]> {
    return this.programaAcademicoRepository.programaAcademicoMateria(id).find(filter);
  }

  @post('/programa-academicos/{id}/materias', {
    responses: {
      '200': {
        description: 'ProgramaAcademico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProgramaAcademico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInProgramaAcademico',
            exclude: ['id'],
            optional: ['programaAcademicoId']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.programaAcademicoRepository.programaAcademicoMateria(id).create(materia);
  }

  @patch('/programa-academicos/{id}/materias', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Materia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Partial<Materia>,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.programaAcademicoMateria(id).patch(materia, where);
  }

  @del('/programa-academicos/{id}/materias', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.programaAcademicoMateria(id).delete(where);
  }
}
