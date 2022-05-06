import React, {useState} from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import * as fs from 'expo-file-system';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: ()=> void;
  onFeedbackSent: ()=> void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string|null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [comment, setComment] = useState<string>("");

  function handleScreenshot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(url=> setScreenshot(url))
    .catch(error=> console.log(error))
  }

  function handleScreenshotRemove(){
    setScreenshot(null);
  }

  async function handleSendFeedback(){
    if(isSendingFeedback){
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await fs.readAsStringAsync(screenshot, {encoding: 'base64'});
    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image 
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        textAlign='left'
        multiline
        autoCorrect={false}
        style={styles.input}
        placeholder="Algo não está funcionando bem ? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={handleScreenshotRemove}
          onTakeShot={handleScreenshot}
          screenshot={screenshot}
        />

        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}/>
      </View>
    </View>
  );
}