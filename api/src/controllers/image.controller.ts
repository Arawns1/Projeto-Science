import { Controller, Get, Param, Post, Res, UseInterceptors, FileTypeValidator, ParseFilePipe, Query, Req, UploadedFile, UploadedFiles } from '@nestjs/common';
import * as path from 'path';
import { of } from 'rxjs';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileHelper } from '../helpers/FileHelper';
import { Request } from 'express';
import { ImageService } from '@services/image.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('imagens')
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('userPhotos/:userPhotoName')
  async getPhotoByUrl(@Param('userPhotoName') userPhotoName: string, @Res() res: Response) {
    return of(res.sendFile(path.join(process.cwd(), `/images/userPhotos/${userPhotoName}`)));
  }

  @Get('personas/:personaPhotoName')
  async getPersonaPhotoByUrl(@Param('personaPhotoName') personaPhotoName: string, @Res() res: Response) {
    return of(res.sendFile(path.join(process.cwd(), `/images/personas/${personaPhotoName}`)));
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

  @Post('/persona/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FileHelper.destinationPersonaPath,
        filename: FileHelper.customPersonaFileName,
      }),
    }),
  )
  uploadPersona(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Query('_personaId') clientId: string,
    @Req() req: Request,
  ) {
    const path = `/images/personas/${req.body.__filename}`;
    this.imageService.savePersonaImage(path, clientId);

    return {
      filePath: `http://${req.get('host')}${path}`,
    };
  }

  @Post('/identidadeVisual/upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: FileHelper.destinationIdentidadeVisualPath,
        filename: FileHelper.customIdentidadeVisualFileName,
      }),
    }),
  )
  uploadIdentidadeVisualFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    files: Array<Express.Multer.File>,
    @Query('_clientId') clientId: string,
    @Req() req: Request,
  ) {
    const paths: string[] = [];

    files.forEach(file => {
      const path = `/images/identidadeVisual/${file.filename}`;
      this.imageService.saveIdentidadeVisualImage(path, clientId);
      paths.push(`http://${req.get('host')}${path}`);
    });

    return {
      paths,
    };
  }
}
