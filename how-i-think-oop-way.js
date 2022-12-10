class IncrementCommand {
  constructor() {
    this.name = 'increment';
  }

  execute(invokerValue) {
    return invokerValue + 1;
  }

  undo(invokerValue) {
    return invokerValue - 1;
  }
}

class DecrementCommand {
  constructor() {
    this.name = 'decrement';
  }

  execute(invokerValue) {
    return invokerValue - 1;
  }

  undo(invokerValue) {
    return invokerValue + 1;
  }
}

class AddCommand {
  constructor(value) {
    this.name = 'add';
    this.value = value;
  }

  execute(invokerValue) {
    return invokerValue + this.value;
  }

  undo(invokerValue) {
    return invokerValue - this.value;
  }
}

class SubCommand {
  constructor(value) {
    this.name = 'subtract';
    this.value = value;
  }

  execute(invokerValue) {
    return invokerValue - this.value;
  }

  undo(invokerValue) {
    return invokerValue + this.value;
  }
}

class Counter {
  constructor(initialValue = 0) {
    this.initialValue = initialValue;
    this.value = initialValue;
    this.commands = [];
  }

  executeCommand(command) {
    this.commands.push(command);
    this.value = command.execute(this.value);
  }

  undoLastCommand() {
    const lastCommand = this.commands[this.commands.length - 1];
    this.commands = this.commands.slice(0, -1);

    this.value = lastCommand.undo(this.value);
  }

  print() {
    const initialRows = [];
    const initialAcc = [initialRows, this.initialValue];

    const [rows, value] = this.commands.reduce((acc, command) => {
      const [currentRows, currentValue] = acc;

      const newValue = command.execute(currentValue);
      const newRow = { command: command.name, value: newValue };

      const newRows = [...currentRows, newRow];
      return [newRows, newValue];
    }, initialAcc);

    console.table(rows);
    console.log('Current value: ', value);
  }
}

const main = () => {
  const counter = new Counter(0);

  counter.executeCommand(new IncrementCommand());
  counter.executeCommand(new IncrementCommand());

  counter.executeCommand(new DecrementCommand());
  counter.executeCommand(new DecrementCommand());

  counter.executeCommand(new AddCommand(10));
  counter.executeCommand(new SubCommand(10));

  counter.print();
}

main();
