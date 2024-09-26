import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropimage'

const CropComponent = ({ src, setCroppedImg, setIsCrop }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                src,
                croppedAreaPixels,
                rotation
            )
            const croppedImageUrl = URL.createObjectURL(croppedImage)
            setCroppedImg(croppedImageUrl)
            setIsCrop(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='border p-4 bg-slate-900'>
            <div className='relative w-full h-[100px] sm:h-[400px]'>
                <Cropper
                    image={src}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    cropShape='round'
                    showGrid={false}
                    aspect={4 / 4}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className='flex flex-col items-stretch  p-4 sm:flex-row sm:items-center'>
                <div className='flex flex-1 items-center sm:min-w-16'>
                    <h3>Zoom</h3>
                    <input
                        className='pl-5 ml-8 '
                        type='range'
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby='Zoom'
                        onChange={(e) => setZoom(e.target.value)}
                    />
                </div>
                <div className='flex flex-col items-stretch  p-4 sm:flex-row sm:items-center'>
                    <h3>Rotation</h3>
                    <input
                        className='pl-5 ml-8 '
                        type='range'
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby='Rotation'
                        onChange={(e) => {
                            setRotation(e.target.value)
                        }}
                    />
                </div>
                <Button
                    className={'rounded-3xl'}
                    type='button'
                    onClick={showCroppedImage}
                >
                    Save
                </Button>
            </div>
            {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
        </div>
    )
}

export default CropComponent
