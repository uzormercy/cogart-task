import { use } from '@app/utils/errors';
import { Router } from 'express';
import {extractAudioVideo, imageTransform, uploadMedia, waterMarkVideo} from "@app/resources/media/media.controller";
import {fileUploadMiddleware} from "@app/utils/helpers";
const router = Router();

router.post('/images', fileUploadMiddleware.single('media'), use(uploadMedia));
router.post('/images/:id/transform', use(imageTransform));
router.post('/videos', fileUploadMiddleware.single('media'), use(uploadMedia));
router.post('/videos/:id/watermark', use(waterMarkVideo));
router.post('/videos/:id/extract-audio', use(extractAudioVideo))

export default router;
