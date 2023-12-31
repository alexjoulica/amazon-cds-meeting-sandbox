import {
  ChimeSDKMeetingsClient,
  DeleteMeetingCommand,
} from '@aws-sdk/client-chime-sdk-meetings';
const config = {
  region: 'eu-west-1',
  credentials: {
    accessKeyId: "AKIA5HSM2YGI73FPNDGV",
    secretAccessKey: "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",
  },
};

const chimeSdkMeetingsClient = new ChimeSDKMeetingsClient(config);

export default async function handler(req, res) {
  const meetingId = req.body.meetingId;
  if (meetingId) {
    console.log(`Ending Meeting: ${meetingId}`);

    if (await deleteMeeting(meetingId)) {
      console.info('Meeting Deleted');
      res.status(200).json({ data: 'Meeting Deleted' });
    } else {
      res.status(503).json({ data: 'Error deleting meeting' });
    }
  } else {
    console.info('No meeting to delete');
    res.status(404).json({ data: 'No meeting to delete' });
  }
}

async function deleteMeeting(meetingId) {
  try {
    await chimeSdkMeetingsClient.send(
      new DeleteMeetingCommand({
        MeetingId: meetingId,
      }),
    );
    return true;
  } catch (err) {
    console.info(`${err}`);
    return false;
  }
}
