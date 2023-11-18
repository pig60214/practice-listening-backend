import { Body, Controller, Get, Post, Route } from "tsoa";
import ITranscription from "../interfaces/transcription";
import ApiResponse from "../interfaces/apiResponse";
import VocabularyService from "../services/vocabularyService";
import IVocabulary from "../interfaces/vocabulary";

@Route("vocabulary")
export class VocabularyController extends Controller {
  private vocabularyService = new VocabularyService();
  @Get("/get-by-transcription-id/{transcriptionId}")
  public async getByTranscriptionId(transcriptionId: number): Promise<ApiResponse<IVocabulary[]>> {
    const result = await this.vocabularyService.getByTranscriptionId(transcriptionId);
    return new ApiResponse(0, result);
  }

  @Post("/add")
  public async add(@Body() request: IVocabulary): Promise<ApiResponse> {
    const result = await this.vocabularyService.add(request);
    return new ApiResponse(result);
  }

  @Post("/update")
  public async update(@Body() request: IVocabulary): Promise<ApiResponse> {
    const result = await this.vocabularyService.update(request);
    return new ApiResponse(result);
  }
}