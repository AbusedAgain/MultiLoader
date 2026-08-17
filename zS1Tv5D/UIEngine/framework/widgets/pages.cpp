#include"../headers/includes.h"
#include "../headers/widgets.h"

void c_widgets::log_reg_page()
{
	gui->begin_content("log_reg_zone", SCALE(elements->log_reg_page.log_reg_width, 0), SCALE(elements->log_reg_page.padding), SCALE(0, elements->window.padding.y), window_flags_no_scroll_with_mouse | window_flags_no_scrollbar);
	{
		draw->shadow_circle(gui->window_drawlist(), gui->window_pos() + ImVec2(gui->window_size().x / 2, SCALE(elements->log_reg_page.padding.y + elements->log_reg_page.shadow_radius)), SCALE(elements->log_reg_page.shadow_radius), draw->get_clr(clr->main.accent, 0.1), SCALE(100), ImVec2(0, 0), 0, 60);
		draw->text_clipped(gui->window_drawlist(), font->get(icons_data, 40), gui->window_pos() + SCALE(0, elements->log_reg_page.padding.y + 4), gui->window_pos() + gui->window_size(), draw->get_clr(clr->main.accent), "A", NULL, NULL, ImVec2(0.5f, 0.f));
		draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_medium_data, 16), gui->window_pos() + SCALE(0, elements->log_reg_page.padding.y + elements->window.padding.y + elements->log_reg_page.shadow_radius * 2 - 4), gui->window_pos() + gui->window_size(), draw->get_clr(clr->main.text), "UIEngine", NULL, NULL, ImVec2(0.5f, 0.f));
		draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_regular_data, 14), gui->window_pos() + ImVec2(0, SCALE(elements->log_reg_page.padding.y + elements->window.padding.y + elements->log_reg_page.shadow_radius * 2 + 1) + gui->text_size(font->get(suisse_intl_medium_data, 16), "UIEngine").y), gui->window_pos() + gui->window_size(), draw->get_clr(clr->main.text, 0.48), "Play with confidence.", NULL, NULL, ImVec2(0.5f, 0.f));
		
		gui->easing(elements->log_reg_page.window_height, var->gui.registration ? (elements->textfield.size.y * 4 + elements->window.padding.y + elements->widgets.spacing.y * 2) : (elements->textfield.size.y * 3 + elements->window.padding.y + elements->widgets.spacing.y * 1), 12.f, dynamic_easing);
		gui->set_pos(ImVec2((gui->window_width() - SCALE(elements->textfield.size.x)) / 2, (gui->window_height() - SCALE(elements->log_reg_page.window_height)) / 2), pos_all);
		gui->begin_content("registration_zone", SCALE(elements->textfield.size.x, 0), SCALE(0, 0), SCALE(0, elements->window.padding.y), window_flags_no_scroll_with_mouse | window_flags_no_scrollbar);
		{
			gui->begin_content("fields_zone", SCALE(elements->textfield.size.x, elements->log_reg_page.window_height - (elements->textfield.size.y + elements->window.padding.y)), SCALE(0, 0), SCALE(0, elements->widgets.spacing.y), window_flags_no_scroll_with_mouse | window_flags_no_scrollbar);
			{
				static char email[20];
				if(var->gui.registration)
					widgets->text_field("email_field", "Email", "d", email, sizeof(email));
				static char username[20];
				widgets->text_field("username_field", "Username", "B", username, sizeof(username));
				static char password[20];
				widgets->text_field("password_field", "Password", "C", password, sizeof(password));

				if (!var->gui.registration && (var->gui.username == username && var->gui.password == password) && var->gui.registered)
					var->gui.stage_count = 1;
				if (var->gui.registration && email[0] != '\0' &&   username[0] != '\0' && password[0] != '\0' && var->gui.registered)
					var->gui.stage_count = 1;
			}
			gui->end_content();

			widgets->reg_log_buttons();
		}
		gui->end_content();
		gui->set_pos(ImVec2((gui->window_width() - SCALE(elements->textfield.size.x)) / 2, gui->window_height() - SCALE(elements->log_reg_page.padding.y + elements->version_card.rect_size.y * elements->version_card.games.size() + elements->version_card.padding * (elements->version_card.games.size() - 1) + elements->version_card.zone_padding + elements->version_card.text_zone_height)), pos_all);
		gui->begin_content("versions_zone", SCALE(elements->textfield.size.x, elements->log_reg_page.padding.y + elements->version_card.rect_size.y * elements->version_card.games.size() + elements->version_card.padding * (elements->version_card.games.size() - 1) + elements->version_card.zone_padding + elements->version_card.text_zone_height), SCALE(0, 0), SCALE(0, elements->version_card.padding));
		{
			draw->text_clipped(gui->window_drawlist(), font->get(icons_data, 10), gui->window_pos(), gui->window_pos() + SCALE(elements->version_card.rect_size.x, elements->version_card.text_zone_height), draw->get_clr(clr->main.text, 0.24), "W", NULL, NULL, ImVec2(0.5f, 0.5f));
			draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_semi_bold_data, 13), gui->window_pos() + SCALE(elements->version_card.rect_size.x + elements->version_card.zone_padding, 0), gui->window_pos() + ImVec2(gui->window_width(), SCALE(elements->version_card.text_zone_height)), draw->get_clr(clr->main.text, 0.48), "VERSION 1.2", NULL, NULL, ImVec2(0.f, 0.5f));
			draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_semi_bold_data, 13), gui->window_pos(), gui->window_pos() + ImVec2(gui->window_width(), SCALE(elements->version_card.text_zone_height)), draw->get_clr(clr->main.text, 0.12), "22.07.25", NULL, NULL, ImVec2(1.f, 0.5f));

			gui->set_pos(SCALE(elements->version_card.text_zone_height + elements->version_card.zone_padding), pos_y);
			for (int i = 0; i < elements->version_card.games.size(); i++)
				widgets->version_card(elements->version_card.games.at(i) + "id", elements->version_card.games.at(i), elements->version_card.updates.at(i), i);
		}
		gui->end_content();
	}
	gui->end_content();
	gui->sameline();
	gui->begin_content("decoration_zone", ImVec2(0, 0), SCALE(0, 0), SCALE(elements->widgets.spacing.x, elements->window.padding.y), window_flags_no_scroll_with_mouse | window_flags_no_scrollbar);
	{
		draw->image_rounded(gui->window_drawlist(), var->gui.decoration[0], gui->window_pos(), gui->window_pos() + ImVec2(gui->window_size().x, SCALE(elements->log_reg_page.img_height)), ImVec2(0, 0), ImVec2(1, 1), draw->get_clr({1.f, 1.f, 1.f, 1.f}), SCALE(elements->widgets.rounding));
		draw->rect(gui->window_drawlist(), gui->window_pos(), gui->window_pos() + ImVec2(gui->window_size().x, SCALE(elements->log_reg_page.img_height)), draw->get_clr(clr->main.text, 0.08), SCALE(elements->widgets.rounding));
		gui->set_pos(SCALE(0, elements->window.padding.y + elements->log_reg_page.img_height), pos_all);

		widgets->info_card("launches_1_id", "E", "Launches", "45.387", (gui->window_size().x - SCALE(elements->widgets.spacing.x * 2)) / 3);
		gui->sameline();
		widgets->info_card("total_users_1_id", "a", "Total Users", "16.274", (gui->window_size().x - SCALE(elements->widgets.spacing.x * 2)) / 3);
		gui->sameline();
		widgets->info_card("products_1_id", "G", "Products", "6", (gui->window_size().x - SCALE(elements->widgets.spacing.x * 2)) / 3);
	}
	gui->end_content();
};

void c_widgets::product_page(c_video_player& player, int img_id, std::string_view name, std::string_view desc, std::string_view launches, std::string_view updated, std::string_view status, std::string_view online)
{
	gui->begin_content("product_desc_content", ImVec2(gui->content_max().x - SCALE(elements->player.size.x + elements->window.padding.x), gui->content_avail().y), SCALE(0, 0), SCALE(elements->widgets.spacing), window_flags_no_scrollbar | window_flags_no_scroll_with_mouse);
	{
		ImGuiContext& g = *GImGui;
		widgets->back_button();

		const ImRect game_rect(ImVec2(g.LastItemData.Rect.Min.x, g.LastItemData.Rect.Max.y + SCALE(elements->widgets.spacing.y)), ImVec2(g.LastItemData.Rect.Min.x + gui->content_avail().x, g.LastItemData.Rect.Max.y + SCALE(elements->widgets.spacing.y + elements->product_page.game_zone_height)));
		const ImRect desc_rect(ImVec2(game_rect.Min.x, game_rect.Max.y + SCALE(elements->product_page.back_button_padding)), gui->window_pos() + gui->window_size() - SCALE(0, elements->widgets.spacing.y * 2 + elements->info_card.height * 2));

		draw->image_rounded(gui->window_drawlist(), var->gui.img_for_versions[img_id], ImVec2(game_rect.Min.x, game_rect.GetCenter().y - SCALE(elements->product_page.img_size.y / 2)), ImVec2(game_rect.Min.x + SCALE(elements->product_page.img_size.x), game_rect.GetCenter().y + SCALE(elements->product_page.img_size.y / 2)), ImVec2(0, 0), ImVec2(1, 1), draw->get_clr({1.f, 1.f, 1.f, 1.f}), SCALE(elements->version_card.rounding));
	
		draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_medium_data, 19), game_rect.Min + SCALE(elements->product_page.img_size.x + elements->product_page.back_button_padding, 0), game_rect.Max, draw->get_clr(clr->main.text), name.data(), gui->text_end(name.data()), NULL, ImVec2(0.f, 0.5f));
	
		std::vector<std::string> lines = gui->wrap_text(font->get(suisse_intl_medium_data, 13), gui->content_avail().x, std::string(desc));

		ImVec2 desc_pos = desc_rect.Min;
		for (const auto& line : lines)
		{
			draw->text_clipped(gui->window_drawlist(), font->get(suisse_intl_medium_data, 13), desc_pos, desc_rect.Max, draw->get_clr(clr->main.text, 0.48), line.c_str());
			desc_pos.y += gui->text_size(font->get(suisse_intl_medium_data, 13), "A").y;
		}

		gui->set_screen_pos(ImVec2(desc_rect.Min.x, desc_rect.Max.y + SCALE(elements->widgets.spacing.y)), pos_all);
		gui->begin_group();
		{
			widgets->info_card("launches_2_id", "E", gui->language("Launches", "Запущено"), "12.679", (gui->window_size().x - SCALE(elements->widgets.spacing.x)) / 2);
			gui->sameline();
			widgets->info_card("updated_2_id", "W", gui->language("Updated", "Обновлено"), "22.07.25", (gui->window_size().x - SCALE(elements->widgets.spacing.x)) / 2);
		}
		gui->end_group();
		gui->begin_group();
		{
			widgets->info_card("status_2_id", "b", gui->language("Status", "Статус"), gui->language("Undetected", "Незамечен"), (gui->window_size().x - SCALE(elements->widgets.spacing.x)) / 2);
			gui->sameline();
			widgets->info_card("online_2_id", "a", gui->language("Online", "Онлайн"), "146", (gui->window_size().x - SCALE(elements->widgets.spacing.x)) / 2);
		}
		gui->end_group();
	}
	gui->end_content();
	gui->sameline();
	gui->begin_content("player_content", ImVec2(SCALE(elements->player.size.x), gui->content_avail().y), SCALE(0, 0), SCALE(elements->widgets.spacing), window_flags_no_scrollbar | window_flags_no_scroll_with_mouse);
	{
		player.render(std::string("cs_demo"), SCALE(var->window.size), name);
		gui->set_screen_pos(GImGui->LastItemData.Rect.Max.y + SCALE(elements->window.padding.y), pos_y);
		if (widgets->launch_button())
			var->gui.loading = true;
		widgets->update_button();
	}
	gui->end_content();

};