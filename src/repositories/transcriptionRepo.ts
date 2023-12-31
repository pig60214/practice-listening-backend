import pool from './connect';
import { objectToCamel } from 'ts-case-convert';
import { IAddTranscription, ITranscription, IUpdateTranscription } from "../interfaces/transcription";

export default class TranscriptionRepo {
  async add(request: IAddTranscription): Promise<number> {
    try {
      await pool.query(`INSERT INTO transcription(title, content, youtube_url) VALUES('${request.title}', '${request.content.replaceAll("'", "''")}', '${request.youtubeUrl}')`);
      return 0;
    } catch (err) {
      console.error('SQL error', err);
      return 1;
    }
  }
  async getById(id: number): Promise<ITranscription> {
    try {
      const result = await pool.query(`SELECT id, title, content, youtube_url FROM transcription WHERE id = ${id}`);
      const data = objectToCamel(result.rows) as ITranscription[];
      return data[0];
    } catch (err) {
      console.error('SQL error', err);
      return {} as ITranscription;
    }
  }
  async updateTranscription(transcription: IUpdateTranscription): Promise<number> {
    try {
      await pool.query(`UPDATE transcription SET title = '${transcription.title}', content = '${transcription.content.replaceAll("'", "''")}', youtube_url = '${transcription.youtubeUrl}' WHERE id = ${transcription.id}`);
      return 0;
    } catch (err) {
      console.error('SQL error', err);
      return 1;
    }
  }
  async getList(): Promise<ITranscription[]>{
    try {
      const result = await pool.query(`SELECT id, title, youtube_url FROM transcription ${process.env.ENV !== 'test' ? 'WHERE is_test = 0': ''}`);
      const data = objectToCamel(result.rows) as ITranscription[];
      return data;
    } catch (err) {
      console.error('SQL error', err);
      return [];
    }
  }
}
