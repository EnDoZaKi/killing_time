import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const AddTags = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [tagList, setTagList] = useState(props.value);

    const onSaveChange = (e) => {
        if (e.key === 'Enter') {
            setTagList(prev => [...prev, e.target.value]);
            setInputValue('');
        }
    }

    const onClickClose = (value) => {
        const updatedTag = tagList.filter(item => item !== value);
        setTagList(updatedTag)
    }

    useEffect(() => {
        props.onSendDataBack(tagList)
    }, [tagList, props])

    const TruncatedText = ({ text, className }) => {
        // State to track if the text is currently overflowing its container.
        const [isOverflowing, setIsOverflowing] = useState(false);

        // State to control the visibility of the tooltip.
        const [showTooltip, setShowTooltip] = useState(false);

        // A ref to the DOM element containing the text.
        const textRef = useRef(null);

        // useLayoutEffect runs synchronously after all DOM mutations.
        // This is preferred over useEffect for DOM measurements to avoid flickering.
        useLayoutEffect(() => {
            const checkOverflow = () => {
                const element = textRef.current;
                if (element) {
                    // Compare the scroll width (full content width) with the client width (visible width).
                    const hasOverflow = element.scrollWidth > element.clientWidth;
                    setIsOverflowing(hasOverflow);
                }
            };

            // Initial check when the component mounts or text changes.
            checkOverflow();

            // Re-check on window resize to handle responsive layout changes.
            window.addEventListener('resize', checkOverflow);

            // Cleanup function to remove the event listener when the component unmounts.
            return () => {
                window.removeEventListener('resize', checkOverflow);
            };
        }, [text]); // Re-run the effect if the text prop changes.

        return (
            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* The text container itself */}
                <p
                    ref={textRef}
                    className={`whitespace-nowrap overflow-hidden text-overflow-ellipsis ${className || ''}`}
                    aria-label={text} // Good for accessibility
                >
                    {text}
                </p>

                {/* The tooltip, which is conditionally rendered */}
                {isOverflowing && showTooltip && (
                    <div
                        className="absolute bottom-full mb-2 w-max max-w-xs sm:max-w-sm md:max-w-md bg-gray-700 text-white text-sm rounded-lg py-2 px-3 shadow-lg z-10"
                        role="tooltip"
                    >
                        {text}
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-700"></div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Container fluid="md">
                <Row>
                    {tagList && (
                        tagList.map((tag, index) => (
                            <Col sm="2" key={index}
                                style={{ backgroundColor: "grey", border: "1px solid grey", borderRadius: "10px", color: "black", margin: "0px 10px 10px 10px" }}>
                                <Row>
                                    <Col><TruncatedText text={tag} /></Col>
                                    <Col style={{ textAlign: "right" }} className='custom-close' onClick={() => onClickClose(tag)}>x</Col>
                                </Row>
                            </Col>
                        ))
                    )}
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={onSaveChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default AddTags;