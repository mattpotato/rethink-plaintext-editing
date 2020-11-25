import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import ReactMarkdown from 'react-markdown';
import path from 'path';

function MarkdownEditor({ file, write }) {
  console.log(file, write);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => setValue(await file.text()))();
  }, [file]);

  const onSave = () => {
    console.log('Saving File');
    const newFile = new File([value], file.name, {
      type: 'text/markdown',
      lastModified: new Date()
    });

    write(newFile, value);
  };

  return (
    <div className={css.editor}>
      <div className={css.title}>
        <div>{path.basename(file.name)}</div>
        {!isEditing && <div onClick={() => setIsEditing(!isEditing)}>EDIT</div>}
      </div>
      {isEditing ? (
        <textarea
          className={css.content}
          autoFocus="true"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => {
            e.preventDefault();
            onSave();
            setIsEditing(!isEditing);
          }}
        />
      ) : (
        <ReactMarkdown className={css.content}>{value}</ReactMarkdown>
      )}
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
