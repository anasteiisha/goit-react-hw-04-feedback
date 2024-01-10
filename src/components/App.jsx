import { useState } from 'react';

import { Statistics } from './Statistics/Statistics';
import { Feedback } from './Feedback/Feedback';
import { Section } from './Section/Section';
import { Notification } from './Notification /Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    const totalPositiveFeedback = countTotalFeedback();
    return Math.round((good / totalPositiveFeedback) * 100);
  };

  const { good, neutral, bad } = feedback;

  return (
    <>
      <Section title="Please leave feedback">
        <Feedback
          options={Object.keys(feedback)}
          onLeaveFeedback={updateFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
