import { Body, Controller, Get, Post, Route } from "tsoa";
import ITranscription from "../interfaces/transcription";
import TranscriptionService from "../services/transcriptionService";
import ApiResponse from "../interfaces/apiResponse";

@Route("transcription")
export class TranscriptionController extends Controller {
  private transcriptionService = new TranscriptionService();
  @Get("/get-list")
  public async getList(): Promise<ApiResponse<ITranscription[]>> {
    const t = await this.transcriptionService.getList();
    return new ApiResponse(0, t);
  }

  @Get("/{id}")
  public async getById(id: number): Promise<ApiResponse<ITranscription>> {
    const t = await this.transcriptionService.getById(id);
    return new ApiResponse(0, t);
  }

  @Post("/update")
  public async updateTranscription(@Body() request: ITranscription): Promise<ApiResponse> {
    const t = await this.transcriptionService.updateTranscription(request);
    return new ApiResponse(t);
  }
}