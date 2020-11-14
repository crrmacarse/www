import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseParamIntPipe implements PipeTransform<string, number> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);

        if(isNaN(val)) {
            throw new BadRequestException('Bad URL param found. Expects a number');
        }

        return val;
    }
}