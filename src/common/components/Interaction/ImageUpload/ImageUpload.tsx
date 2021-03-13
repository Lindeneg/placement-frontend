import { useState, useEffect, useRef } from 'react';

import Button from '../Button/Button';
import { InputHandler } from '../../../hooks/form';
import { BaseProps, Functional, Identifiable, OnChange } from "../../../types";
import formClasses from '../Input/Input.module.css';
import classes from './ImageUpload.module.css';


interface ImageProps extends BaseProps, Identifiable {
    onInput   : InputHandler,
    center   ?: boolean,
    errorText?: string
};


/**
 * Selection of (image) files with a preview display added.
 */

const ImageUpload: Functional<ImageProps> = props => {
    const [file, setFile]       = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof file !== 'undefined') {
            const fileReader: FileReader = new FileReader();
            fileReader.onload = () => {
                setPreview(fileReader.result?.toString());
            };
            fileReader.readAsDataURL(file);
        }
    }, [file]);

    const onImageChosenHandler: OnChange<HTMLInputElement> = event => {
        let metaValid: boolean;
        let file: File | string = '';
        if (event.target.files && event.target.files.length > 0) {
            file = event.target.files[0];
            setFile(file);
            metaValid = true;
            setIsValid(true);
        } else {
            metaValid = false;
            setIsValid(false);
        }
        props.onInput(props.id, file, metaValid);
    }

    const onImageUploadHandler = (): void => {
        ref.current && ref.current.click();
    }

    return (
        <div className={formClasses.Control}>
            <input 
                ref={ref}
                id={props.id} 
                type='file' 
                style={{display: 'none'}} 
                accept='.jpg,.jpeg,.png' 
                onChange={onImageChosenHandler}
            />
            <div className={[classes.Upload, props.center && classes.center].join(' ')}>
                <div className={classes.Preview}>
                    {preview && <img src={preview} alt='Preview' />}
                    {!preview && <p>Please choose an image.</p>}
                </div>
                <Button type='button' onClick={onImageUploadHandler} >UPLOAD IMAGE</Button>
            </div>
            {!isValid && props.errorText && <p>{props.errorText}</p>}
        </div>
    )
};


export default ImageUpload;