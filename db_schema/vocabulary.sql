CREATE TABLE vocabulary (
   id SERIAL PRIMARY KEY,
   transcription_id INT NOT NULL,
   word VARCHAR(50) NOT NULL,
   video_offset INT

   CONSTRAINT fk_vocabulary
      FOREIGN KEY(transcription_id)
	  REFERENCES transcription(id)
);