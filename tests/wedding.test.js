import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCountdown } from '../src/utils/helpers.js';
import { weddingConfig } from '../src/data/weddingConfig.js';

const target = `${weddingConfig.weddingDate}T${weddingConfig.weddingTime}:00${weddingConfig.weddingUtcOffset}`;

test('wedding countdown targets 6 PM in India, rather than midnight', () => {
  assert.equal(new Date(target).toISOString(), '2027-02-12T12:30:00.000Z');
  assert.deepEqual(calculateCountdown(target, new Date('2027-02-11T12:29:59Z')), {
    days: 1, hours: 0, minutes: 0, seconds: 1, isOver: false,
  });
});

test('countdown remains active on the wedding morning', () => {
  const result = calculateCountdown(target, new Date('2027-02-12T00:00:00+05:30'));
  assert.equal(result.hours, 18);
  assert.equal(result.isOver, false);
});

test('the wedding begins at the same instant for guests in different timezones', () => {
  for (const now of ['2027-02-12T18:00:00+05:30', '2027-02-12T07:30:00-05:00', '2027-02-12T12:30:00Z']) {
    assert.deepEqual(calculateCountdown(target, new Date(now)), {
      days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true,
    });
  }
});

test('past or invalid targets cannot display negative or NaN countdowns', () => {
  for (const date of [target, 'invalid']) {
    assert.deepEqual(calculateCountdown(date, new Date('2027-02-13T12:30:00Z')), {
      days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true,
    });
  }
});
