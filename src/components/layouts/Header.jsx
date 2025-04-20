import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import Button from '../ui/Button';
import FluxTextArea from '../ui/FluxTextArea';
import toast from 'react-hot-toast';
const Header = ({ onThemeChange, domain }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ideaError, setIdeaError] = useState('');


    const validateIdea = (idea) => {
        if (idea.length > 2048) {
            setIdeaError('Idea must be less than 2048 characters');
            return false;
        } 

        if (idea.trim() === '') {
            setIdeaError('Idea cannot be empty');
            return false;
        }

        if (idea.length < 1) {
            setIdeaError('Idea must be at least 1 character');
            return false;
        }

        setIdeaError('');
        return true;
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('neoTheme');
        if (savedTheme) {
            document.body.dataset.neoTheme = savedTheme;
            setIsDarkTheme(savedTheme === 'dark');
            onThemeChange(savedTheme === 'dark');
        }
    }, [onThemeChange]);

    const themeHandler = () => {
        const theme = document.body.dataset.neoTheme;
        if (theme === 'light') {
            document.body.dataset.neoTheme = 'dark';
            localStorage.setItem('neoTheme', 'dark');
            setIsDarkTheme(true);
            onThemeChange(true);
        } else {
            document.body.dataset.neoTheme = 'light';
            localStorage.setItem('neoTheme', 'light');
            setIsDarkTheme(false);
            onThemeChange(false);
        }
    }

    const handleSubmit = async () => {
        console.log('submit idea', idea);
        setIsLoading(true);
        const loadingToast = toast.loading('Submitting idea...');
        try {
            const response = await fetch(`${domain}/api/ideas/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idea }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit idea');
            }
            setIdea('');
            toast.success('Idea submitted successfully!', { id: loadingToast });
            setIsLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting idea:', error);
            toast.error('Failed to submit idea', { id: loadingToast });
            setIsLoading(false);
        }
    }

    const getInputState = () => {
        return ideaError ? 'error' : 'default';
    }

    return (
        <header className="p-3 d-flex justify-content-between align-items-center header">
            <h1>PHI Linkify</h1>

            <nav className="d-flex justify-content-between align-items-center">
                <ul className="d-flex justify-content-between align-items-center" style={{ gap: '20px' }}>
                    <li>
                        <button
                            type="button"
                            title="have an idea?"
                            className="icon-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <i className="fa-duotone fa-regular fa-lightbulb"></i>
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={themeHandler} title="change theme" className="icon-button">

                            <i className={`fa-duotone fa-regular ${isDarkTheme ? 'fa-sun' : 'fa-moon-stars'}`}></i>
                        </button>
                    </li>
                </ul>
            </nav>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Share Your Idea"
            >
                <p className="mb-3">We'd love to hear your ideas to improve PHI Linkify!</p>
                <div className="mb-3 ">
                    <FluxTextArea id="idea" disabled={isLoading} state={getInputState()}
                        label={`Your Idea ${idea.length > 0 ? `(${idea.length}/2048)` : ''}`} value={idea} maxLength={2048} minLength={1} required={true}
                        onChange={(e) => {
                            setIdea(e.target.value);
                            validateIdea(e.target.value);
                        }}
                        helperText={ideaError} />
                </div>
                <Button variant="primary" disabled={isLoading || ideaError || !idea.trim()}
                    onClick={handleSubmit} type="submit">Submit</Button>
            </Modal>
        </header>
    );
};

export default Header;
