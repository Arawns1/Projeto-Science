import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
  FileTypeValidator,
  ParseFilePipe,
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common';
import * as path from 'path';
import { of } from 'rxjs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileHelper } from '../helpers/FileHelper';
import { Request } from 'express';
import { ImageService } from '@services/image.service';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) { }

  @Get('userPhotos/:userPhotoName')
  async getPhotoByUrl(
    @Param('userPhotoName') userPhotoName: string,
    @Res() res: Response,
  ) {
    return of(
      res.sendFile(
        path.join(process.cwd(), `/images/userPhotos/${userPhotoName}`),
      ),
    );
  }

  @Post('/clientPhoto/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FileHelper.destinationUserPath,
        filename: FileHelper.customUserFileName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Query('_clientId') clientId: string,
    @Req() req: Request,
  ) {
    const path = `/images/userPhotos/${req.body.__filename}`;
    this.imageService.saveImage(path, clientId);

    return {
      filePath: `http://${req.get('host')}${path}`,
    };
  }
}
