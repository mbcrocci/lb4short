import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Url } from '../models';
import { UrlRepository } from '../repositories';
import { generate } from 'shortid';

export class UrlController {
  constructor(
    @repository(UrlRepository)
    public urlRepository: UrlRepository,
  ) { }

  @post('/urls', {
    responses: {
      '200': {
        description: 'Url model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Url) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {
            title: 'NewUrl',

          }),
        },
      },
    })
    url: Url,
  ): Promise<Url> {
    const short = generate();
    const date = (new Date()).toISOString();

    return this.urlRepository.create({ shortid: short, date: date, ...url });
  }

  @get('/urls/count', {
    responses: {
      '200': {
        description: 'Url model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Url)) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.count(where);
  }

  @get('/urls', {
    responses: {
      '200': {
        description: 'Array of Url model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Url, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Url)) filter?: Filter<Url>,
  ): Promise<Url[]> {
    return this.urlRepository.find(filter);
  }

  @patch('/urls', {
    responses: {
      '200': {
        description: 'Url PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, { partial: true }),
        },
      },
    })
    url: Url,
    @param.query.object('where', getWhereSchemaFor(Url)) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.updateAll(url, where);
  }

  @get('/urls/{id}', {
    responses: {
      '200': {
        description: 'Url model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Url, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Url)) filter?: Filter<Url>
  ): Promise<Url> {
    return this.urlRepository.findById(id, filter);
  }

  @patch('/urls/{id}', {
    responses: {
      '204': {
        description: 'Url PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, { partial: true }),
        },
      },
    })
    url: Url,
  ): Promise<void> {
    await this.urlRepository.updateById(id, url);
  }

  @put('/urls/{id}', {
    responses: {
      '204': {
        description: 'Url PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() url: Url,
  ): Promise<void> {
    await this.urlRepository.replaceById(id, url);
  }

  @del('/urls/{id}', {
    responses: {
      '204': {
        description: 'Url DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.urlRepository.deleteById(id);
  }
}
