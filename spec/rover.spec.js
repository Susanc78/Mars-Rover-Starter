const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it ("constructor sets position and default values for mode and generatorWatts", function() {
    expect (new Rover(98382)).toEqual({position: 98382, mode: 'NORMAL', generatorWatts: 110});
    });
  it ("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with STATUS_CHECK', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).message).toEqual('Test message with STATUS_CHECK');
    });
  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Test message with STATUS_CHECK and MOVE', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).results.length).toEqual(2);
    });
  it ("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with STATUS_CHECK', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 98382}}]);
    });
  it ("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with MODE_CHANGE', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    });
  it ("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 20)];
    let message = new Message('Test message with MODE_CHANGE and MOVE', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).results).toEqual([{completed: true}, {completed: false}]);
    });
  it ("responds with position for move command", function() {
    let commands = [new Command('MOVE', 20)];
    let message = new Message('Test message with MOVE', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(20);
    })

});
