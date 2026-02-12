import styles from './VideoReview.module.css';

interface VideoReviewProps {
    videoId: string;
}

const VideoReview = ({ videoId }: VideoReviewProps) => {
    return (
        <div className={styles.container}>
            <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoReview;
