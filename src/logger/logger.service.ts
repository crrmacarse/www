import { Injectable, Logger } from '@nestjs/common';
import { promises } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';

@Injectable()
export class CustomLoggerService extends Logger {
  error(message: string, trace: string) {
    this.writeFile(message, 'error');

    super.error(message, trace);
  }

  /**
   * This intends to track user behaviour in the system.
   */
  warn(message: string, context?: string) {
    this.writeFile(message, 'warn');
  
    super.warn(message, context);
  }

  /**
   * TODO
   * 
   * Intends to write in db. This will be used for activity tracking.
   */
  verbose(message: string, context?: string) {
    super.verbose(message, context);
  }

  private async writeFile(text: string, type: 'error' | 'warn') {
    const currDate = format(new Date(), 'yyyy-MM-dd');
    const filePath = join(process.cwd(), 'logs', `${currDate}-${type}-logs.txt`);
  
    await promises.appendFile(filePath, `[${new Date().toISOString()}] ${text}\n`); 
  }
}