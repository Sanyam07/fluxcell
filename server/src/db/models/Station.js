import { Model } from 'objection';
import Channel from './Channel';
import User from './User';
import { getLocalTime } from '../../utils/helper.js';

export default class Station extends Model {
  static get tableName() {
    return 'station';
  }
  static get relationMappings() {
    return {
      channel: {
        relation: Model.HasManyRelation,
        modelClass: Channel,
        join: {
          from: 'station.id',
          to: 'channel.station_id',
        },
      },
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'station.id',
          to: 'user.station_id',
        },
      },
    };
  }
  $beforeUpdate() {
    this.updated_at = getLocalTime();
  }
  $beforeInsert() {
    this.created_at = getLocalTime();
  }
}
