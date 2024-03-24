import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const Comment = () => {
  const [commentText, setCommentText] = useState("");
  
  return (
    <View style={styles.commentInputContainer}>
          <TextInput
            placeholder="Write a comment..."
            style={styles.commentInput}
            value={commentText}
            onChangeText={text => setCommentText(text)}
          />
          <TouchableOpacity onPress={handleCommentSubmit}>
            <Text style={styles.commentSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
  )
}

export default Comment