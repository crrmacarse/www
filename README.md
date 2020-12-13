# Personal API Server

Using NestJS as framework.

## Setup

```bash
# before proceeding, make sure to have .env file in the root folder(refer to given .env.example)
$ npm install
```

> After succesfully starting up the application, A publicly available API documentation can be visited via `/docs` route

## Development

```bash
# start development
$ npm run start:dev

# Or utilize hot reloading. This will result for faster develoopment build time(recommended)
$ npm run start:hot
```

It is highly recommended to run testing on background

```bash
# run testing on background
$ npm run test:watch
```

Lost?

```bash
# run our built-in documentation
$ npm run doc
```

### Debugging

```bash
# Run the application in debug mode
npm run start:debug
```

> TIP: You could manually set `DEBUG=true` in your `.env` file for a minimal version of debugger. Stack traces can be found on the error log files.

### Logging

Log files can be found inside `logs` folder. File errors is created in a daily basis. You might need to do
a clean-up once in a while.

## Production

```bash
# build production files
$ npm run build

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Known Issues

- Becareful of importing `module.ts` instead of `http-module.ts` in resolving module dependency. You should be using the `http` version. There will be no errors for it, Only showing "running" but the server doesn't start.
- Serialization response returns "support" columns first instead of PK. This is due to extending of BaseEntity. An issue was already raised about this here: https://github.com/typeorm/typeorm/issues/541
- From NestJS regarding Serialization: "Note that we must return an instance of the class. If you return a plain JavaScript object, for example, { user: new UserEntity() }, the object won't be properly serialized". To mitigate such issue, utilize `plainToClass` from `class-transformer`.
- Added `--forceExit` in e2e tests run as it doesn't seem to end on its own(https://github.com/nestjs/nest/issues/1538)
- Adding `select:false` on column entity with a hook-based approach(Example: `@BeforeInsert`, `@BeforeUpdate`) won't be triggered.

## Resources

- https://nestjs.com/
- https://github.com/nestjs/nest
- https://wanago.io/2020/07/06/api-nestjs-unit-tests/
- https://www.carloscaballero.io/part-9-clock-in-out-system-testing-backend-unit-test-services/

## Get in touch

<p>
<a href="https://twitter.com/crrmacarse">
<img src="https://img.shields.io/badge/crrmacarse%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>
</a>
<a href="https://www.linkedin.com/in/christian-ryan-r-macarse-692974166/">
<img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="https://stackoverflow.com/users/10030210/crrmacarse?tab=profile">
<img src="https://cdn.sstatic.net/Sites/stackoverflow/company/Img/logos/so/so-logo.svg?v=a010291124bf" width="110px" />
</a>
</p>