import { useCountdown } from '../hooks/useCountdown';
import './Countdown.scss';

export const Countdown = ({ targetDate }) => {
  const countdown = useCountdown(targetDate);

  if (countdown.isOver) {
    return (
      <div className="countdown countdown-over">
        <p className="countdown-message">The celebration is here!</p>
      </div>
    );
  }

  return (
    <div className="countdown">
      <div className="countdown-items">
        <div className="countdown-item">
          <div className="countdown-value">{String(countdown.days).padStart(2, '0')}</div>
          <div className="countdown-label">Days</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
          <div className="countdown-label">Hours</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">Minutes</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
