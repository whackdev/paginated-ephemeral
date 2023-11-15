import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';

@ApplyOptions<Command.Options>({
	description: 'ping pong'
})
export class UserCommand extends Command {
	// Register Chat Input and Context Menu command
	public override registerApplicationCommands(registry: Command.Registry) {
		// Register Chat Input command
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}

	// Chat Input (slash) command
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });
		const display = new PaginatedMessage().setActions(
			PaginatedMessage.defaultActions.filter(
				(action) =>
					'customId' in action &&
					[
						'@sapphire/paginated-messages.previousPage',
						'@sapphire/paginated-messages.stop',
						'@sapphire/paginated-messages.nextPage'
					].includes(action.customId)
			)
		);

		display.addPageContent('Page 1').addPageContent('Page 2');

		return display.run(interaction);
	}
}
