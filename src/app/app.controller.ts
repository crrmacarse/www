import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('general')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @TODO: Add test for this
  @ApiExcludeEndpoint()
  @Get(['documentation', 'documentations', 'help', 'api'])
  redirectToDocsRout(@Res() res) {
    return res.redirect('/docs'); 
  }
}
