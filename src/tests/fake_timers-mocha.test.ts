import { expect } from 'chai'
import sinon from 'sinon'
import { generateDayMessage } from './fake_timers'

describe('generateDayMessage', () => {
  beforeEach(() => {
    sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.clock.restore()
  })

  it('returns a message containing the current time', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-01T02:00:00+02:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('2:00:00 AM')
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-01T02:00:00+02:00'))
    // Act
    expect(generateDayMessage()).to.contain('2:00:00 AM')

    sinon.clock.tick(63140)
    // Assert
    expect(generateDayMessage()).to.contain('2:01:03 AM')
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-01T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Monday')
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-02T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Tuesday')
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-03T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Wednesday')
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-04T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Thursday')
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-05T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Friday')
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-06T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Saturday')
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    sinon.clock.setSystemTime(new Date('2021-03-07T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).to.contain('Sunday')
  })
})
