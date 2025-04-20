import FluxTextArea from '../ui/FluxTextArea';
import Button from '../ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

function MainContent({ domain }) {
    const [longUrl, setLongUrl] = useState('');
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setLongUrl(value);
        validateUrl(value);
    };

    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            const allowedProtocols = ['http:', 'https:'];

            if (!allowedProtocols.includes(parsedUrl.protocol)) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    };

    const validateUrl = (url) => {
        if (!url.trim()) {
            setError('URL cannot be empty.');
            return;
        }

        if (url.length > 1000) {
            setError('URL is too long. Maximum length is 1000 characters.');
            return;
        }

        if (/\s/.test(url)) {
            setError('URL should not contain spaces.');
            return;
        }

        if (!isValidUrl(url)) {
            setError('Invalid or unsupported URL format.');
            return;
        }

        setError('');
    };


    const getInputState = () => {
        if (error) return 'error';
        if (longUrl && !error) return 'success';
        return 'default';
    };

    const handleSubmit = async () => {
        if (error) return;

        setLoading(true);
        const loadingToast = toast.loading('Generating short URL...');

        try {
            const response = await fetch(`${domain}/api/links/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: longUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            setCode(data.data.code);
            toast.success('Short URL generated successfully!', { id: loadingToast });
        } catch (error) {
            console.error('Error shortening URL:', error);
            toast.error('Failed to generate short URL', { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        const shortUrl = `${domain}/${code}`;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(shortUrl);
                toast.success('URL copied to clipboard!');
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = shortUrl;
                textArea.style.position = 'fixed';
                textArea.style.left = '0';
                textArea.style.top = '0';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                toast.success('URL copied to clipboard!');
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy URL');
        }
    }

    const handleNew = () => {
        setCode('');
        setLongUrl('');
        setError('');
        setLoading(false);
    }


    return code ? (
        <section className="container main-section d-flex justify-content-center align-items-center flex-column py-md-5 py-3">
            <div className="main-section-content">
                <h2 className="main-section-title mb-5">Your short URL is ready</h2>
                <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center">
                        <a href={`${domain}/${code}`} target="_blank" rel="noopener noreferrer">
                            {`${domain}/${code}`}
                        </a>
                    </p>
                </div>

                <div className="row">
                    <div className='col-0 col-md-3'></div>
                    <div className="col-md-6 col-12 px-2">
                        <Button variant="primary" style={{ border: '2px solid transparent' }} className="mt-4" onClick={handleCopy}>Copy</Button>
                    </div>
                    <div className='col-0 col-md-3'></div>
                    <div className='col-0 col-md-3'></div>
                    <div className="col-md-6 col-12 px-2">
                        <Button variant="outline" className="mt-3" onClick={handleNew}>New</Button>
                    </div>
                    <div className='col-0 col-md-3'></div>
                </div>
            </div>
        </section>
    ) : (
        <section className="container main-section d-flex justify-content-center align-items-center flex-column py-md-5 py-3">
            <div className="main-section-content">
                <h2 className="main-section-title mb-3">Paste your long URL here</h2>
                <FluxTextArea
                    label={`Long URL ${ longUrl.length > 0 ? `(${longUrl.length}/1000)` : ''}`}
                    required={true}
                    rows={5}
                    maxLength={1000}
                    minLength={1}
                    onChange={handleChange}
                    helperText={ error || (longUrl && !error ? "URL is valid" : "Please enter a valid URL")}
                    value={longUrl}
                    state={getInputState()} 
                    disabled={loading}
                />

                <Button variant="primary" disabled={!longUrl || error || loading} className="mt-3" onClick={handleSubmit}>Generate Short URL</Button>

            </div>
        </section>
    );
}

export default MainContent; 