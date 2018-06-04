export class Question{

  private _category: string;
  private _type: string;
  private _difficulty: string;
  private _question: string;
  private _correct_answer: string;
  private _incorrect_answers: Array<string>;
  constructor(){

  }

  /**
   * return all the possible answers for a question, shuffled randomly.
   * @returns {string[]}
   */
  public getAnswers(){
    let answers = this.incorrect_answers.slice();
    answers.push(this.correct_answer);
    return answers.sort((a, b) => Math.random() > .5 ? -1 : 1);
  }

  static fakeAnswer(){
    return ['A', 'B', 'C', 'D'];
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get difficulty(): string {
    return this._difficulty;
  }

  set difficulty(value: string) {
    this._difficulty = value;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }


  get correct_answer(): string {
    return this._correct_answer;
  }

  set correct_answer(value: string) {
    this._correct_answer = value;
  }

  get incorrect_answers(): Array<string> {
    return this._incorrect_answers;
  }

  set incorrect_answers(value: Array<string>) {
    this._incorrect_answers = value;
  }

}
