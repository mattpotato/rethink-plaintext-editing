import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import path from 'path';
function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      console.log(file);
      setValue(await file.text());
    })();
  }, [file]);

  const onSave = () => {
    console.log('Saving File');
    const newFile = new File([value], file.name, {
      type: 'text/plain',
      lastModified: new Date()
    });

    write(newFile, value);
  };
  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <textarea
        className={css.content}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={e => {
          e.preventDefault();
          onSave();
        }}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
