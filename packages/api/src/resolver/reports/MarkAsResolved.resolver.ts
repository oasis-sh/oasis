import Report from '@entity/Report';
import { Role } from '@enum/Roles';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class MarkAsResolvedResolver {
  @Authorized(Role.Moderator)
  @Mutation(() => Boolean)
  async markAsResolved(
    @Arg('reportId') reportId: string,
    @Arg('resolved') resolved: boolean
  ) {
    const report = await Report.findOne(reportId);
    report.resolved = resolved;
    report.save();

    return true;
  }
}
