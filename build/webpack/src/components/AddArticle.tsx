import * as React from 'react';


interface IProps {
    name: string,
    title: string,
    summary: string,
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onChangeSummary: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClickAdd: any
}

export default class AddArticle extends React.Component<IProps> {
  public render() {
    const {
      name,
      title,
      summary,
      onChangeTitle,
      onChangeSummary,
      onClickAdd
    } = this.props;

    return (
      <section>
        <h1>{name}</h1>
        <input
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
        />
        <input
          placeholder="Summary"
          value={summary}
          onChange={onChangeSummary}
        />
        <button onClick={onClickAdd}>Add</button>
      </section>
    );
  }
}