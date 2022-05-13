import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
  .setTitle("Anubi Coding Interview")
  .setDescription("Anubi Digital API")
  .setVersion("1.0")
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  
  // FIXME validate incoming requests, yet it wont works -.-
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  await app.listen(3081)
}
bootstrap()
