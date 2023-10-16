import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = () => {
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;