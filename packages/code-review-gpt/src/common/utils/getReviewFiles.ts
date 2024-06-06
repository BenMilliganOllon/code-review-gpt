import { PlatformOptions, ReviewFile } from "../types";
import { getRemotePullRequestFiles as getRemotePullRequestFilesGithub } from "../remote/github/getRemotePullRequestFiles";
import { getRemotePullRequestFiles as getRemotePullRequestFilesBitbucket } from "../remote/bitbucket/getRemotePullRequestFiles";

export const getReviewFiles = async (
  isCi: string | undefined,
  remotePullRequest: string | undefined
): Promise<ReviewFile[]> => {
  if (remotePullRequest !== undefined) {
    // FIXME
    // does the bitbucket getter for pr files function the same as github? If so, rm
    if (isCi === PlatformOptions.BITBUCKET) {
      return await getRemotePullRequestFilesBitbucket(remotePullRequest);
    } else {
      return await getRemotePullRequestFilesGithub(remotePullRequest);
    }
  } else {
    const { getFilesWithChanges } = await import("../git/getFilesWithChanges");

    return await getFilesWithChanges(isCi);
  }
};
