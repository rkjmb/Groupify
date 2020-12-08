import React, { useState } from 'react';

const UploadForm = ({ setImage }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setImage(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpg)');
        }
    };

    return (
        <form>
            <label>
                <input className='uploader' type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg" />
                <span className='cursor'>Group Logo</span>
            </label>
            <div>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
}

export default UploadForm;