const rs                     = require('../../mockUser'),
      currentUnitMeasurement = require('./index.js')
    ;

describe('currentUnitMeasurement metric units', () => {
  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'units', 'metric');
  });

  it('should show user shorthand measurement units', () => {
    expect(currentUnitMeasurement('short')).toBe('kgs');
  });

  it('should show user long form measurements units', () => {
    expect(currentUnitMeasurement('long')).toBe('kilos');
  });

  it('should return kilograms', () => {
    expect(currentUnitMeasurement('short')).not.toBe('lbs');
  });
});

describe('currentUnitMeasurement imperial units', () => {

  beforeAll(() => {
    rs.setUservar(rs.currentUser(), 'units', 'imperial');
  });

  it('should show user shorthand measurement units', () => {
    expect(currentUnitMeasurement('short')).toBe('lbs');
  });

  it('should show user longform measurement units', () => {
    expect(currentUnitMeasurement('long')).toBe('pounds');
  });

  it('should return pounds', () => {
    expect(currentUnitMeasurement('short')).not.toBe('kgs');
  });
});